from fastapi import FastAPI,HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import tasks_collection
from bson import ObjectId
from bson.errors import InvalidId
from datetime import datetime


app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/api/v1/analytics/users/{user_id}/statistics")
def get_user_statistics(user_id:str):
    try:
        mongo_user_id=ObjectId(user_id)
    except InvalidId:
        raise HTTPException(status_code=400,detail="Invalid User ID format")


    tasks=list(tasks_collection.find({"user":mongo_user_id},{"_id":0}))

    total_tasks=len(tasks)

    if total_tasks==0:
        return {
            "total_tasks": 0, 
            "completed_tasks": 0, 
            "pending_tasks": 0, 
            "priority_distribution": {"Low": 0, "Medium": 0, "High": 0},
            "completion_rate": "0%"
        }
    
    completed_count=0
    pending_count=0
    priority_distribution={"low":0,"Medium":0,"High":0}
    for task in tasks:
        if task.get("status")=="Completed":
            completed_count+=1
        else:
            pending_count+=1
        priority=task.get("priority", "Low")
        if priority in priority_distribution:
            priority_distribution[priority]+=1
    
    completion_rate=round((completed_count/total_tasks)*100,1)

    return {
        "total_tasks": total_tasks,
        "completed_tasks": completed_count,
        "pending_tasks": pending_count,
        "priority_distribution": priority_distribution,
        "completion_rate": f"{completion_rate}%"
    }


@app.get("/api/v1/analytics/users/{user_id}/productivity")
def get_productivity_trends(user_id:str, start_date:str, end_date:str):
    try:
        mongo_user_id=ObjectId(user_id)
        start_dt=datetime.strptime(start_date,"%Y-%m-%d")
        end_dt=datetime.strptime(end_date,"%Y-%m-%d").replace(hour=23, minute=59, second=59)
    except (InvalidId,ValueError):
        raise HTTPException(status_code=400,detail="Invalid ID or Date Format. Use YYYY-MM-DD")
    

    query={
        "user": mongo_user_id, 
        "status": "Completed", 
        "updatedAt": {         # Targeting the Mongoose timestamp
            "$gte": start_dt, 
            "$lte": end_dt 
        }
    }
    completed_tasks = list(tasks_collection.find(query, {"_id": 0}))
    trend_data = {}
    
    for task in completed_tasks:
        # PyMongo automatically translates Mongoose Dates into Python datetimes!
        updated_at = task.get("updatedAt")
        
        if updated_at:
            # Format it back to a simple string (YYYY-MM-DD) for your React chart
            date_string = updated_at.strftime("%Y-%m-%d")
            
            if date_string in trend_data:
                trend_data[date_string] += 1
            else:
                trend_data[date_string] = 1
            
    formatted_trend = [{"date": date, "completed": count} for date, count in trend_data.items()]
    formatted_trend.sort(key=lambda x: x["date"])
    
    return {"trends": formatted_trend}