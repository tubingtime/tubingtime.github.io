import json
import csv


print("TJ's Super Epic JSON & CSV Splicer")

jsonFileName = "us-state-centroids.json"
csvFileName = "expensive-states.csv"
with open(jsonFileName,"r") as json_read_file:
    jsonData = json.load(json_read_file)
with open(csvFileName, newline='\n') as csvfile:
    csvReader = csv.reader(csvfile)
    for row in csvReader:
        for entry in jsonData["features"]:
            oldentry = entry["properties"]
            if (oldentry["name"] == row[1]):
                entry["properties"] = {
                    'name' : entry["properties"]["name"],
                    'population' : entry["properties"]["population"],
                    'gradrate' : row[2]
                }
                

def write_json():
    with open("spliced.json",'w') as json_write_file:
        json.dump(jsonData,json_write_file)
    print("json dumped!");
    
#uncomment to output file
#write_json();