import sys
import json
import scipdf

if len(sys.argv) != 2:
    print("Usage: python3 example.py <pdf_file>")
    sys.exit(1)
    
article_dict = scipdf.parse_pdf_to_dict("pdf/" + sys.argv[1])

# convert dictionary to json
json_string = json.dumps(article_dict)
print(json_string)