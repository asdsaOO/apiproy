import sys
import json
import numpy as np
import pandas as pd
import os
from sklearn.ensemble import RandomForestRegressor
import joblib

# Obtener la ruta absoluta del script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Definir la ruta global al modelo
model_file_path = os.path.join(script_dir, '../data/random_forest_model.pkl')

# Leer los datos desde stdin
input_data = sys.stdin.read()

# Convertir los datos JSON a un objeto de Python
activities = json.loads(input_data)

# Cargar el modelo entrenado
model = joblib.load(model_file_path)

# Crear un DataFrame con las mismas columnas que se usaron en el entrenamiento
X_new = pd.DataFrame([ 
    [activity['id'], activity['id_tema'], activity['id_subtema'], activity['id_usuario']] 
    for activity in activities
], columns=['ID Actividad Realizada', 'ID Tema', 'ID Subtema', 'ID Usuario'])  # Solo 4 columnas

# Obtener las predicciones de puntaje para cada actividad
predictions = model.predict(X_new)

# Definir el umbral para identificar actividades no resolubles
threshold = 0.5  # Puedes ajustar este valor según el comportamiento de tu modelo

# Lista para almacenar las actividades no resolubles
non_resolvable_activities = []

# Filtrar las actividades que no se pueden resolver (puntaje bajo)
for i, score in enumerate(predictions):
    # Si score es un array, toma el primer valor
    score = score[0] if isinstance(score, np.ndarray) else score
    
    if score < threshold:  # Si el puntaje es menor que el umbral, es no resoluble
        non_resolvable_activities.append(activities[i]['id'])
    
    # Limitar a 5 actividades no resolubles
    if len(non_resolvable_activities) == 5:
        break

# Devolver las actividades no realizables
print(json.dumps(non_resolvable_activities))
