import re
import fitz

from pdfminer.high_level import extract_text
import tabula
import random
from PyPDF2 import PdfReader


def allTextFromFile():
    text = extract_text('backend/UPLOAD_FOLDER/July3-August2.pdf')
    return text

def splitArray(text):
    words = text.split("\n")
    return words
    

def getAmountSpent():
    amount = []
    text = allTextFromFile()    
    for i in range(len(text)):
        if (text[i] == "$"):
            amount.append(text[i: i+10])
    
    amount = removeDollarAndExtraCharacter(amount)    
    return amount
    
def removeDollarAndExtraCharacter(amount):
    toReturn = []
    for i in range(len(amount)):
        #print("amount[i] before", amount[i])
        amount[i] = removeUnecessaryString(amount[i])
    
    for i in range(len(amount)):
        if (amount[i].startswith("-")):
            continue
        else:
            toReturn.append(amount[i])

    return toReturn

def removeUnecessaryString(str):
    valid = "-0123456789."
    toReturn = ""
    for i in range(len(str)):
        for j in range(len(valid)):
            if (str[i] == valid[j]):
                toReturn += str[i]
    return toReturn

def getFinalAmountSpent():
    amount = getAmountSpent()
    toReturn = [float(numeric_string) for numeric_string in amount]
    return toReturn

def getAllCategories():
    # vals = []
    # toReturn = []
    text = allTextFromFile()

        
    popularCategories = ["merchandise", "services", "restaurants", "gasoline", "travel/", "supermarkets",
                         "education", "medical", "home"]
    
    
    extracted_categories = []
    for line in text.split(','):
       flag = False
       for word in line.split(" "):
            for category in popularCategories:
                if category in word.lower():
                    if (category == "travel/"):
                        extracted_categories.append("travel/entertainment")
                    elif (category == "medical"):
                        extracted_categories.append("medical services")
                        flag = True
                    elif (category == "home"):
                        extracted_categories.append("home imporvement")
                    elif flag and category == "services":
                        flag = False
                        continue
                    else:
                        extracted_categories.append(category)
                    break
    return extracted_categories



def extract_text_from_pdf(pdf_path):
    reader = PdfReader(pdf_path)  # Open the PDF file
    text = ""
    for page in reader.pages:  # Iterate through each page
        text += page.extract_text()  # Extract text from the page
    return text




            
def main():
   

    amount = getFinalAmountSpent()
    cat = getAllCategories()
    print(len(amount), len(cat))
    print(cat)
    for i in range(0, len(amount)):
        print(amount[i], cat[i])
        
        
    # pdf_path = 'backend/UPLOAD_FOLDER/August3-Sep2.pdf'
    # pdf_text = extract_text_from_pdf(pdf_path)
    # print(pdf_text)
    
    #print(extract_transactions("backend/UPLOAD_FOLDER/August3-Sep2.pdf"))

    
main()


