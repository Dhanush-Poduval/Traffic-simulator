from pydantic import BaseModel
from datetime import datetime

class Cars(BaseModel):
    car_amount:int
    intersection_name:str
class Intersection(BaseModel):
    car_amount:int
    signal:str
    intersection_name:str