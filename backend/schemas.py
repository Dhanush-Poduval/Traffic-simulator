from pydantic import BaseModel
from datetime import datetime

class Cars(BaseModel):
    entry_time:datetime
    location:str
class Intersection(BaseModel):
    car_amount:int
    signal:str
    intersection_name:str