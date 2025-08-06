from zoneinfo import ZoneInfo
from .database import Base
from sqlalchemy import Column,Integer,String
from sqlalchemy.orm import relationship
from sqlalchemy import DateTime
from datetime import datetime

class Cars(Base):
    __tablename__='cars'
    id=Column(Integer,primary_key=True,index=True)
    entry_time=Column(DateTime(timezone=True),default=lambda:datetime.now(ZoneInfo("Asia/Kolkata")))
    location=Column(String)

class Intersection(Base):
    __tablename__='Intersection'
    id=Column(Integer,primary_key=True)
    car_amount=Column(Integer)
    signal=Column(String)
    intersection_name=Column(String)