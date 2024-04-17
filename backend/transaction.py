import re
import fitz
import os
import csv

from pdfminer.high_level import extract_text
import tabula
import random

from PyPDF2 import PdfReader



def addMatchesToCsvFile(filename, matches, dateMatches):
    
    dir = "backend/UPLOAD_FOLDER/"
    if not os.path.exists(dir):
        os.makedirs(dir)
    
    # index funds ETFS, bonds, Crypto, 
    
    csvFilename = "transactions.csv"
    csvFilePath = os.path.join(dir, csvFilename)
    
    writeHeader = not os.path.exists(csvFilePath)
    with open(csvFilePath, "a", newline='') as file:
        writer = csv.writer(file)
        
        
        if writeHeader:
           writer.writerow(['Month', "Date", "Amount", "Category"])
        
        # removing the pdf
        filename = filename[0:len(filename)-4]
        month = getMonth(filename)
        for (amount, category), date in zip(matches, dateMatches):
            #amount = float(amount)
            if category != "Payments and Credits":
                try:
                    amount = float(amount.replace(',', ''))  # Remove commas and convert to float
                    writer.writerow([month, date, amount, category])
                except ValueError:
                    print(f"Skipping invalid amount: {amount}")
            else:
                continue
            
def getMonth(fileName):
    # Jan 1, Feb 2, Mar 3, Apr 4, May 5, Jun 6, Jul 7, Aug 8, Sep 9, Oct 10, Nov 11, 
    if fileName.startswith("Jan"):
        return 1
    elif fileName.startswith("Feb"):
        return 2
    elif fileName.startswith("Mar"):
        return 3
    elif fileName.startswith("Apr"):
        return 4
    elif fileName.startswith("May"):
        return 5
    elif fileName.startswith("Jun"):
        return 6
    elif fileName.startswith("Jul"):
        return 7
    elif fileName.startswith("Aug"):
        return 8
    elif fileName.startswith("Sep"):
        return 9
    elif fileName.startswith("Oct"):
        return 10
    elif fileName.startswith("Nov"):
        return 11
    else:
        return 12
        
        

def extractTextFromPDF(pdf_path):
    # if the other hard way is not working, we have to use this function
    try:
        reader = PdfReader(pdf_path) 
        text = ""
        for page in reader.pages:  
            text += page.extract_text() 
        return text
    except Exception as e:
        print(f"Failed to process {pdf_path}: {str(e)}")
        return ""

     
def main():
   

    # amount = getFinalAmountSpent()
    # cat = getAllCategories()
    # print(len(amount), len(cat))
    # print(cat)
    # for i in range(0, len(amount)):
    #     print(amount[i], cat[i])
        
    dir = "backend/UPLOAD_FOLDER/"
    for filename in os.listdir(dir):
        if filename.lower().endswith(".pdf"):
            filepath = os.path.join(dir, filename)
            pdf_text = extractTextFromPDF(filepath)
            #print(pdf_text)
            if pdf_text:
                datePattern = r'^(\d{2}/\d{2}/\d{2})'
                dateMatches = re.findall(datePattern, pdf_text, re.MULTILINE)
                pattern = r'\$(\d{1,3}(?:,\d{3})*\.\d{2})([A-Za-z /]+)'
                matches = re.findall(pattern, pdf_text)
                
                if (len(matches) == 0):
                    pattern = r'\$\s*(-?\d{1,3}(?:,\d{3})*\.\d{2})\s+([A-Za-z/ ]+)'
                    matches = re.findall(pattern, pdf_text)
                
                addMatchesToCsvFile(filename, matches, dateMatches)
                for amount, category in matches:
                    print(f"Amount: ${amount}, Category: {category.strip()}")
                for dates in dateMatches:
                    print(dates)
            else:
                print(f"No text extracted from {filename}")
            

main()


