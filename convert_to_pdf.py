import os
import sys
import markdown
from weasyprint import HTML, CSS
from weasyprint.text.fonts import FontConfiguration

def convert_md_to_pdf(md_file, output_pdf):
    """
    Convert a Markdown file to a styled PDF
    """
    # Check if the markdown file exists
    if not os.path.exists(md_file):
        print(f"Error: File {md_file} not found.")
        return False
    
    # Read the markdown file
    with open(md_file, 'r', encoding='utf-8') as f:
        md_content = f.read()
    
    # Convert markdown to HTML
    html_content = markdown.markdown(md_content, extensions=['tables', 'fenced_code'])
    
    # Add CSS styling
    styled_html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>MedAssist Interview Guide</title>
        <style>
            @page {{
                size: letter;
                margin: 1.5cm;
            }}
            body {{
                font-family: 'Helvetica', 'Arial', sans-serif;
                line-height: 1.5;
                color: #333;
            }}
            h1 {{
                color: #4A148C;
                font-size: 24pt;
                text-align: center;
                margin-bottom: 20px;
            }}
            h2 {{
                color: #00897B;
                font-size: 18pt;
                margin-top: 20px;
                border-bottom: 1px solid #ddd;
                padding-bottom: 5px;
            }}
            h3 {{
                color: #4A148C;
                font-size: 14pt;
            }}
            p {{
                margin-bottom: 10px;
            }}
            ul, ol {{
                margin-left: 20px;
            }}
            li {{
                margin-bottom: 5px;
            }}
            code {{
                background-color: #f4f4f4;
                padding: 2px 4px;
                border-radius: 3px;
                font-family: monospace;
                font-size: 90%;
            }}
            a {{
                color: #00897B;
                text-decoration: none;
            }}
            hr {{
                border: none;
                border-top: 1px solid #ddd;
                margin: 20px 0;
            }}
            .footer {{
                text-align: center;
                font-style: italic;
                margin-top: 30px;
            }}
        </style>
    </head>
    <body>
        {html_content}
    </body>
    </html>
    """
    
    # Configure fonts
    font_config = FontConfiguration()
    
    # Convert HTML to PDF
    try:
        HTML(string=styled_html).write_pdf(
            output_pdf,
            stylesheets=[],
            font_config=font_config
        )
        print(f"Successfully converted {md_file} to {output_pdf}")
        return True
    except Exception as e:
        print(f"Error converting to PDF: {e}")
        return False

if __name__ == "__main__":
    # Get the directory of the script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Define input and output files
    md_file = os.path.join(script_dir, "MedAssist_Interview_Guide.md")
    pdf_file = os.path.join(script_dir, "MedAssist_Interview_Guide.pdf")
    
    # Convert the file
    print("Converting MedAssist Interview Guide to PDF...")
    convert_md_to_pdf(md_file, pdf_file)
    
    # Installation instructions if there's an error
    print("\nNote: If you encounter any errors, you may need to install the required packages:")
    print("pip install markdown weasyprint")
    print("\nFor WeasyPrint, you might also need to install GTK+ on Windows:")
    print("See: https://doc.courtbouillon.org/weasyprint/stable/first_steps.html#windows")
