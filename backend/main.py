from typing import List
from fastapi import FastAPI,Depends , HTTPException,status
from .import models,schemas
from .database import engine,SessionLocal
from sqlalchemy.orm import Session
import random

app=FastAPI()

neighbours={
    'A':['B','D'],
    'B':['A','C'],
    'C':['B','D'],
    'D':['C','A']
}


intersections=['Signal A','Signal B','Signal C','Signal D']
    

def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()

models.Base.metadata.create_all(bind=engine)


@app.post('/intersection', status_code=200, response_model=schemas.Intersection)
def car_generator(db: Session = Depends(get_db)):
    intersection_name = random.choice(intersections)
    intersection = db.query(models.Intersection).filter(models.Intersection.intersection_name == intersection_name).first()
    
    if not intersection:
        #like create all the colums like if not present 
        intersection = models.Intersection(car_amount=0, signal='Red', intersection_name=intersection_name)
        db.add(intersection)
        db.commit()
        db.refresh(intersection)

    # Add random cars to this intersection
    cars_to_add = round(random.uniform(0, 50))
    intersection.car_amount += cars_to_add
    db.commit()
    db.refresh(intersection)
    return intersection


@app.get('/details',response_model=List[schemas.Intersection])
def get_all(db:Session=Depends(get_db)):
    values=db.query(models.Intersection).all()
    return values





@app.post('/intersection/{intersection_name}',response_model=schemas.Intersection)
def count_logic(intersection_name,db:Session=Depends(get_db)):
    intersection=db.query(models.Intersection).filter(models.Intersection.intersection_name==intersection_name).first()
    if not intersection:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND , detail="Invalid intersection")
    #like the car counting logic thing

    cars=intersection.car_amount
    #randomize car count from cars
    random_cars=round(random.uniform(0,cars))

    #to get the places where these cars can like go too
    short_name=intersection_name.split()[-1]
    neightbour_list=neighbours.get(short_name,[])

    cars_first=random.randint(0,random_cars)
    cars_second=random_cars-cars_first

    for neighbour_short , cars_toadd in zip(neightbour_list,[cars_first,cars_second]):
        neighbour_full_name=f'Signal {neighbour_short}'
        neighbor = db.query(models.Intersection).filter(models.Intersection.intersection_name == neighbour_full_name).first()
        if not neighbor:
            neighbor = models.Intersection(car_amount=0, signal='Red', intersection_name=neighbour_full_name)
            db.add(neighbor)
            db.commit()
            db.refresh(neighbor)
        neighbor.car_amount += cars_toadd
        db.commit()
        db.refresh(neighbor)
            
    
    
    intersection.car_amount=0
    

    


    db.commit()
    db.refresh(intersection)
    return intersection
    
     

      
    



