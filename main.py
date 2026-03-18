from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
import random

app = FastAPI()

#defining the endpoint
@app.get("/number")

#function that gets called by the user
async def get_number():
    n1 = random.randint(0,12)
    n2 = random.randint(0,12)
    
    return {"n1":n1, "n2":n2}

@app.get("/answer")
async def problem_answer(n1:int,n2:int):
    answer = n1 * n2
    
    return {"answer": answer}







app.mount("/", StaticFiles(directory="static", html=True), name="static")