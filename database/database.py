import mysql.connector
from mysql.connector import errorcode

class Database:
    def db_connection():
        try:
            cnx = mysql.connector.MySQLConnection(user='root', password='',
                                                  host='localhost',
                                                  database='Project1')
            print(cnx)
            print("Connection Succesful")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Something is wrong with your username or password")
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist")
            else:
                print(err)
        else:
            cnx.close()
