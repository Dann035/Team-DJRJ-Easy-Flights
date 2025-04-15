from sqlalchemy import create_engine,text
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

print("Intentando conectarse a:", DATABASE_URL)

try:
    engine = create_engine(DATABASE_URL, echo=True)
    with engine.connect() as connection:
        result = connection.execute(text("SELECT 1;"))
        print("✅ Conexión exitosa:", result.fetchone())
except Exception as e:
    print("❌ Error de conexión:")
    print(type(e).__name__, str(e))
