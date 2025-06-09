import re

url = "https://www.gdziepolek.pl/produkty/279313,red-no-2?region=poznan&pvid=279313"
match = re.search(r"/produkty/(\d+)", url)
print("match:", match.group(1) if match else "BRAK")
