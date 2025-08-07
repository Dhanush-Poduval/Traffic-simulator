from typing import List
from fastapi import FastAPI,Depends
from .import models,schemas
from .database import engine,SessionLocal
from sqlalchemy.orm import Session
import random

app=FastAPI()


intersections=['Signal A','Signal B','Signal C','Signal D']
    

def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()

models.Base.metadata.create_all(bind=engine)


@app.post('/intersection',status_code=201,response_model=schemas.Intersection)
def car_generator(db:Session=Depends(get_db)):
    new_values=models.Intersection( car_amount=round(random.uniform(0,50)),signal='Red',intersection_name=random.choice(intersections))
    db.add(new_values)
    db.commit()
    db.refresh(new_values)
    return new_values

@app.get('/details',response_model=List[schemas.Intersection])
def get_all(db:Session=Depends(get_db)):
    values=db.query(models.Intersection).all()
    return values


@app.post('/car/details',response_model=schemas.Cars)
def get_cars(db:Session=Depends(get_db)):
    new_values=models.Cars(car_amount=round(random.uniform(0,10)),intersection_name=random.choice(intersections))
    db.add(new_values)
    db.commit()
    db.refresh(new_values)
    return new_values

@app.get('/car/details',response_model=List[schemas.Cars])
def show_cars(db:Session=Depends(get_db)):
    values=db.query(models.Cars).all()
    return values

    

      
    



