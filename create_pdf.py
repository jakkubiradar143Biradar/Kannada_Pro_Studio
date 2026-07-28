import os
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

def generate_pdf(filename):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()
    
    # Custom Palette
    COLOR_PRIMARY = colors.HexColor("#1e1b4b")   # Deep Indigo
    COLOR_ACCENT = colors.HexColor("#7c3aed")    # Electric Purple
    COLOR_CYAN = colors.HexColor("#0284c7")      # Bright Cyan
    COLOR_TEXT = colors.HexColor("#0f172a")      # Dark Navy
    COLOR_BG_LIGHT = colors.HexColor("#f8fafc")  # Light Gray
    COLOR_CARD_BORDER = colors.HexColor("#cbd5e1")

    # Paragraph Styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=COLOR_PRIMARY,
        alignment=1, # Center
        spaceAfter=6
    )

    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=COLOR_ACCENT,
        alignment=1,
        spaceAfter=15
    )

    section_header = ParagraphStyle(
        'SectionHeader',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=16,
        textColor=COLOR_PRIMARY,
        spaceBefore=10,
        spaceAfter=6
    )

    body_text = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13,
        textColor=COLOR_TEXT
    )

    bold_text = ParagraphStyle(
        'BoldTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=COLOR_TEXT
    )

    link_style = ParagraphStyle(
        'LinkStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        textColor=COLOR_CYAN
    )

    code_style = ParagraphStyle(
        'CodeStyle',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor("#0f172a")
    )

    story = []

    # Document Header Title
    story.append(Paragraph("📢 <b>ಮಾಹಿತಿ ಚಕ್ರ Pro AI Voice Studio</b>", title_style))
    story.append(Paragraph("⚡ 100% Free 100 HD AI Voices - Master Resource Links & Documentation", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=2, color=COLOR_ACCENT, spaceAfter=15))

    # Important Web Links Table
    story.append(Paragraph("🚀 1. Primary Live Deployment & Source Code Links", section_header))

    links_data = [
        [
            Paragraph("<b>RESOURCE / SERVICE</b>", bold_text),
            Paragraph("<b>DIRECT CLICKABLE LINK</b>", bold_text),
            Paragraph("<b>DESCRIPTION</b>", bold_text)
        ],
        [
            Paragraph("<b>🌐 Live Web App</b>", body_text),
            Paragraph('<a href="https://kannada-pro-studio.onrender.com"><u>https://kannada-pro-studio.onrender.com</u></a>', link_style),
            Paragraph("Render 24/7 Cloud Live App with 100 Pro AI Voices & Real-time Modulator Engine.", body_text)
        ],
        [
            Paragraph("<b>🐙 GitHub Repository</b>", body_text),
            Paragraph('<a href="https://github.com/jakkubiradar143Biradar/Kannada_Pro_Studio"><u>https://github.com/jakkubiradar...</u></a>', link_style),
            Paragraph("Full project source code repo synced with automatic Render deployments.", body_text)
        ],
        [
            Paragraph("<b>📰 Mahiti Chakra Web</b>", body_text),
            Paragraph('<a href="https://mahitichakra.in"><u>https://mahitichakra.in</u></a>', link_style),
            Paragraph("Official Hostinger WordPress website integrated with Pro AI Voice Studio.", body_text)
        ],
        [
            Paragraph("<b>📑 WordPress Live Page</b>", body_text),
            Paragraph('<a href="https://mahitichakra.in/kannada-ai-voice"><u>https://mahitichakra.in/kannada-ai-voice</u></a>', link_style),
            Paragraph("Dedicated WordPress page for visitors to generate Kannada AI voices.", body_text)
        ],
        [
            Paragraph("<b>✏️ WordPress Editor Draft</b>", body_text),
            Paragraph('<a href="https://mahitichakra.in/?page_id=3571"><u>https://mahitichakra.in/?page_id=3571</u></a>', link_style),
            Paragraph("Custom HTML block preview & page editor draft link.", body_text)
        ],
        [
            Paragraph("<b>📱 Android APK Builder</b>", body_text),
            Paragraph('<a href="https://www.webintoapp.com"><u>https://www.webintoapp.com</u></a>', link_style),
            Paragraph("WebIntoApp cloud builder dashboard used to compile Universal APK.", body_text)
        ]
    ]

    table = Table(links_data, colWidths=[120, 230, 190])
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), COLOR_BG_LIGHT),
        ('TEXTCOLOR', (0, 0), (-1, 0), COLOR_PRIMARY),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 7),
        ('TOPPADDING', (0, 0), (-1, -1), 7),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ('GRID', (0, 0), (-1, -1), 0.5, COLOR_CARD_BORDER),
    ]))
    story.append(table)
    story.append(Spacer(1, 15))

    # WordPress Embed Code Section
    story.append(Paragraph("💻 2. WordPress Custom HTML Embed Code", section_header))
    story.append(Paragraph("Copy and paste this snippet into your Hostinger WordPress Custom HTML Block:", body_text))
    story.append(Spacer(1, 5))

    embed_code_text = (
        '&lt;!-- Mahiti Chakra Pro AI Voice Studio --&gt;<br/>'
        '&lt;div style="width:100%; max-width:100%; overflow:hidden; border-radius:20px;"&gt;<br/>'
        '&nbsp;&nbsp;&nbsp;&nbsp;&lt;iframe src="https://kannada-pro-studio.onrender.com" width="100%" height="900px" style="border:none; width:100%; max-width:100%; border-radius:20px; box-shadow: 0 10px 40px rgba(0,0,0,0.5);"&gt;&lt;/iframe&gt;<br/>'
        '&lt;/div&gt;'
    )
    
    code_table = Table([[Paragraph(embed_code_text, code_style)]], colWidths=[540])
    code_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#f1f5f9")),
        ('LEFTPADDING', (0, 0), (-1, -1), 10),
        ('RIGHTPADDING', (0, 0), (-1, -1), 10),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('BOX', (0, 0), (-1, -1), 1, colors.HexColor("#94a3b8")),
    ]))
    story.append(code_table)
    story.append(Spacer(1, 15))

    # Mobile App & Local Files Section
    story.append(Paragraph("📲 3. Android APK & Local Computer Directory", section_header))
    
    app_info = [
        [
            Paragraph("<b>📱 APK File Name</b>", body_text),
            Paragraph("<b>app-release.apk</b> (884 KB - Universal Android 5.0 to 15+ Support)", body_text)
        ],
        [
            Paragraph("<b>🎨 App Icon</b>", body_text),
            Paragraph("<b>app_icon.png</b> (512x512 3D Neon Glossy Glassmorphic Icon)", body_text)
        ],
        [
            Paragraph("<b>💬 Sent Via</b>", body_text),
            Paragraph("Personal WhatsApp chat (<b>J K (You)</b>)", body_text)
        ],
        [
            Paragraph("<b>📂 Desktop Folder</b>", body_text),
            Paragraph("<code>C:\\Users\\ADMIN\\Desktop\\pro ai voice</code>", body_text)
        ]
    ]

    info_table = Table(app_info, colWidths=[140, 400])
    info_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#ffffff")),
        ('GRID', (0, 0), (-1, -1), 0.5, COLOR_CARD_BORDER),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(info_table)
    story.append(Spacer(1, 20))

    # Footer Notice
    story.append(HRFlowable(width="100%", thickness=1, color=COLOR_CARD_BORDER, spaceAfter=8))
    story.append(Paragraph("© 2026 <b>ಮಾಹಿತಿ ಚಕ್ರ (mahitichakra.in)</b>. All rights reserved. Created with pure Node.js EdgeTTS & Render Cloud.", ParagraphStyle('Footer', parent=styles['Normal'], fontName='Helvetica-Oblique', fontSize=8, leading=10, textColor=colors.HexColor("#64748b"), alignment=1)))

    doc.build(story)
    print(f"Successfully generated PDF: {filename}")

if __name__ == '__main__':
    desktop_pdf = r"C:\Users\ADMIN\Desktop\pro ai voice\ai voice pdf link.pdf"
    root_desktop_pdf = r"C:\Users\ADMIN\Desktop\ai voice pdf link.pdf"
    
    generate_pdf(desktop_pdf)
    generate_pdf(root_desktop_pdf)
