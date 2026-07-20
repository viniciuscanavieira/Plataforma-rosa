from pathlib import Path

html_path = Path(r'c:\Users\Vinicius\Documents\Modelo Doksa\pagina rosa\plataforma-rosa-ui-reference.html')
text = html_path.read_text(encoding='utf-8')

style_start = text.find('<style>')
style_end = text.find('</style>', style_start)
script_start = text.find('<script>')
script_end = text.find('</script>', script_start)

if style_start == -1 or style_end == -1:
    raise RuntimeError('style tag not found')
if script_start == -1 or script_end == -1:
    raise RuntimeError('script tag not found')

style_content = text[style_start + len('<style>'):style_end].strip() + '\n'
script_content = text[script_start + len('<script>'):script_end].strip() + '\n'

css_path = html_path.with_name('styles.css')
js_path = html_path.with_name('scripts.js')

css_path.write_text(style_content + '\n/* CTA button fixed in external stylesheet */\n.cta-final .btn-white { font-size: 14px; padding: 16px 36px; }\n', encoding='utf-8')
js_path.write_text(script_content + '\n', encoding='utf-8')

new_html = (
    text[:style_start]
    + '<link rel="stylesheet" href="styles.css">\n'
    + text[style_end + len('</style>'):script_start]
    + '<script src="scripts.js" defer></script>\n'
    + text[script_end + len('</script>'):]
)
new_html = new_html.replace(' class="btn btn-white" style="font-size:14px;padding:16px 36px;"', ' class="btn btn-white"')
html_path.write_text(new_html, encoding='utf-8')
print('Created styles.css and scripts.js, updated HTML.')
