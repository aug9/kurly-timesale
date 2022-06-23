import sqlite3
import os
from datetime import datetime
import math

DB_FILE_DIR = os.path.expanduser('~/Documents')
DB_FILE_NAME = 'kurly.db'
DB_FILE_FULL_PATH = os.path.join(DB_FILE_DIR, DB_FILE_NAME)

def make_connection():
    global conn, cursor
    conn = sqlite3.connect(DB_FILE_FULL_PATH)
    conn.row_factory = sqlite3.Row
    conn.set_trace_callback(print)
    cursor = conn.cursor()

def init_kurly_item():
    try:
        cursor.execute('DELETE FROM timesale')
        conn.commit()
    except Exception as e:
        print ('exception occured')
        print(type(e))
        print(e)

def insert_kurly_item(data):
    try:
        cursor.execute('INSERT INTO timesale (no, name, price, discount_percent, desc, img, sticker) VALUES (?, ?, ?, ?, ?, ?, ?)',
            (data['no'], data['name'], data['price'], data['discount_percent'], data['desc'], data['img'], data['sticker'])
        )
        conn.commit()
    except Exception as e:
        print ('exception occured')
        print(type(e))
        print(e)

def get_kurly_items():
    try:
        sql = "SELECT no, name, price, discount_percent, desc, img, sticker FROM timesale ORDER BY discount_percent DESC"
        cursor.execute(sql)
        return cursor.fetchall()
    except Exception as e:
        print ('exception occured')
        print(type(e))
        print(e)

def delete_kurly_items(no):
    try:
        cursor.execute('INSERT INTO ban_item (no, name) VALUES (?, (SELECT name FROM timesale WHERE no = ?))', (no, no))
        conn.commit()
        
        cursor.execute('DELETE FROM timesale WHERE no = ?', (no, ))
        conn.commit()
    except Exception as e:
        print ('exception occured')
        print(type(e))
        print(e)

def insert_ban_keyword(keyword):
    try:
        sql = "INSERT INTO ban_keyword (keyword) VALUES (?)"
        cursor.execute(sql, (keyword, ))
        conn.commit()
    except Exception as e:
        print ('exception occured')
        print(type(e))
        print(e)

def get_ban_keyword():
    try:
        sql = "SELECT keyword FROM ban_keyword"
        cursor.execute(sql)
        return cursor.fetchall()
    except Exception as e:
        print ('exception occured')
        print(type(e))
        print(e)

def delete_item_by_keyword(keyword):
    try:
        cursor.execute("DELETE FROM timesale WHERE name LIKE '%' || ? || '%'", (keyword, ))
        conn.commit()
    except Exception as e:
        print ('exception occured')
        print(type(e))
        print(e)


def delete_item_by_ban_list():
    try:
        cursor.execute("DELETE FROM timesale WHERE no IN (SELECT no FROM ban_item)")
        conn.commit()
    except Exception as e:
        print ('exception occured')
        print(type(e))
        print(e)

def get_latest_deal_info(work_name):
    try:
        sql = "SELECT deal_timestamp, deal_date FROM work ORDER BY deal_timestamp DESC LIMIT 1"
        cursor.execute(sql)
        return cursor.fetchone()
    except Exception as e:
        print ('exception occured')
        print(type(e))
        print(e)

def insert_deal_info(work_name):
    try:
        sql = "INSERT INTO work (name, deal_timestamp, deal_date) VALUES (?, ?, ?)"
        cursor.execute(sql, (work_name, math.floor(datetime.now().timestamp()), datetime.now()))
        conn.commit()
    except Exception as e:
        print ('exception occured')
        print(type(e))
        print(e)
