import os
import pandas as pd
from sklearn.ensemble import RandomForestRegressor  # Asegúrate de usar el regressor
from sklearn.model_selection import train_test_split
import joblib

# Obtener la ruta absoluta del script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Definir la ruta absoluta del archivo CSV
csv_file_path = os.path.join(script_dir, '../data/inpDataModel.csv')

# Cargar los datos desde el archivo CSV
data = pd.read_csv(csv_file_path)

# Imprimir las columnas para verificar
print(data.columns)

# Definir las características (X) y la etiqueta (y)
X = data[['ID Actividad Realizada', 'ID Tema', 'ID Subtema','ID Usuario']]  # Ahora sin 'ID Tipo'
y = data[['Resultado', 'Tiempo']]  # Etiqueta (0 o 1), dependiendo de cómo quieras predecir

# Dividir los datos en entrenamiento y prueba (80% entrenamiento, 20% prueba)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Inicializar el modelo Random Forest
model = RandomForestRegressor(n_estimators=100, random_state=42)

# Entrenar el modelo con los datos de entrenamiento
model.fit(X_train, y_train)

# Evaluar el modelo con los datos de prueba
y_pred = model.predict(X_test)

# Mostrar el reporte de clasificación (puedes cambiar a otro tipo de métrica según tus necesidades)
from sklearn.metrics import mean_squared_error
print("Error cuadrático medio:", mean_squared_error(y_test, y_pred))

# Definir la ruta para guardar el modelo entrenado
model_file_path = os.path.join(script_dir, '../data/random_forest_model.pkl')

# Guardar el modelo entrenado en un archivo
joblib.dump(model, model_file_path)

print("Modelo entrenado y guardado correctamente.")