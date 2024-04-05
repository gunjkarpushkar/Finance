import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import warnings
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

df = pd.read_csv("backend/mpg.csv")
print(df.shape)
print(df.head(10))
print(df.isnull().any)

# Handle missing values (if any)
# (For now) replace missing values with the median of that column
df.fillna(df.median(), inplace=True)

# Selecting the features and the target
X = df.drop(['mpg', 'name'], axis=1)  # assuming 'mpg' is the target and 'name' is non-numeric
y = df['mpg']