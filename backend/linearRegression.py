import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import warnings

df = pd.read_csv("backend/mpg.csv")
print(df.shape)
print(df.head(10))
print(df.isnull().any)