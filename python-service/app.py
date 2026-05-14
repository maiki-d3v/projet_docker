from flask import Flask, jsonify
import mysql.connector

app = Flask(__name__)

def obtener_conexion():
    return mysql.connector.connect(
        host="172.20.0.2",
        user="root",
        password="root123",
        database="universidad"
    )

@app.route('/stats')
def stats():

    conexion = obtener_conexion()

    cursor = conexion.cursor()

    cursor.execute("SELECT COUNT(*) FROM estudiantes")

    total = cursor.fetchone()[0]

    cursor.close()
    conexion.close()

    return jsonify({
        "total_estudiantes": total
    })

@app.route('/')
def home():
    return jsonify({
        "mensaje": "Servicio Python funcionando"
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)