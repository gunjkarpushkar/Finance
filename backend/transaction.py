import re
import fitz

from pdfminer.high_level import extract_text
import tabula
import random


# for page_layout in extract_pages("backend/UPLOAD_FOLDER/August3-Sep2.pdf"):
#     for element in page_layout:

#         print(element)
    

# def extract_transactions(pdf_path):
#     doc = fitz.open(pdf_path)
#     transactions = []

#     for page in doc:
#         text = page.get_text("text")
#         lines = text.split('\n')
#         for line in lines:
#             if line.startswith('02/'):  
#                 parts = line.split('$')
#                 if len(parts) > 1:
#                     category_part = parts[0].strip()
#                     amount_part = parts[1].strip()
#                     category = category_part.split()[-1]  
#                     amount = amount_part.split()[0]  
#                     try:
#                         amount = float(amount)
#                         transactions.append({"category": category, "amount": amount})
#                     except ValueError:
#                         pass  

#     return transactions

# Example usage



def allTextFromFile():
    text = extract_text('backend/UPLOAD_FOLDER/Feb3-Mar2.pdf')
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
    vals = []
    toReturn = []
    text = allTextFromFile()
    arr = splitArray(text)            
    #print(arr)
    for i in range(len(arr)):
        if (arr[i].startswith("$") or arr[i].startswith("0") or len(arr[i]) < 5):
            continue
        else:
            vals.append(arr[i])
        
    popularCategories = ["merchandise", "restaurants", "gasoline", "travel/ entertainment", "supermarkets",
                         "education"]
    print(vals)
    for i in range(len(vals)):
        for j in range(len(popularCategories)):
            if (vals[i].lower() == popularCategories[j]):
                toReturn.append(vals[i])
                
    return toReturn
            
def main():
   

    print(getFinalAmountSpent())
    
            
    # print("\n") 
    # print(vals)
    # arr1 = getAllCategories()
    # arr2 = getFinalAmountSpend()
    # for i in range(len(arr2)):
    #     if (arr1[i] == IndexError):
    #         print(i, "empty", arr2[i])
    #     else:
    #         print(i, arr1[i], arr2[i])
    
    # pdf_path = 'backend/UPLOAD_FOLDER/Feb3-Mar2.pdf'
    # transactions = extract_transactions(pdf_path)
    # print(transactions)
    
main()


 

# tables = tabula.read_pdf("backend/UPLOAD_FOLDER/August3-Sep2.pdf", pages ="all")
# print(tables)