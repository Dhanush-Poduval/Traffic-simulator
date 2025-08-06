from fastapi import FastAPI

app=FastAPI()

@app.get('/A/cars')
def test():
    return 'Hello'


@app.post('/A/cars')
def post_cars():
    pass

@app.put('/A/cars')
def update_cars():
    pass
