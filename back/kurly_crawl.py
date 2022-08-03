import requests
import re
import math
from datetime import datetime
import db

def check_work_availability():
    deal_info = db.get_latest_deal_info("crawl")
    if deal_info:
        delta = math.floor(datetime.now().timestamp()) - deal_info['deal_timestamp']
        if delta < 5 * 60:
            print("5분 내에 탐색 작업을 수행한 이력이 있습니다 : " + str(delta) + "s")
            exit()

    db.insert_deal_info("crawl")

def get_headers():
    req = requests.get(f'https://www.kurly.com/nx/api/session') 
    data = req.json()
    print(data['accessToken'])
    headers = {'authorization': 'Bearer ' + data['accessToken']}
    return headers

def get_products(page_no, headers):
    print(page_no)
    req = requests.get(
      f'https://api.kurly.com/showroom/v2/products/time-sale?sort_type=&page={page_no}&per_page=99',
      headers=headers)
    data = req.json()
    products = data['data']
    if len(products) == 0:
        return []
    
    result = []
    for product in products:
        result.append({
            'no': int(product['no']),
            'name': product['name'],
            'price': int(product['discounted_price']),
            'discount_percent': int(product['discount_rate']),
            'desc': product['short_description'],
            'img': product['list_image_url'],
            'sticker': product['sticker'],
            'is_sold_out': product['is_sold_out'],
        })

    for value in result:
        sticker = value['sticker']
        value['sticker'] = ''
        if sticker:
            for content in sticker['content']:
                if content['text'].find('%'):
                    value['sticker'] = content['text']
    return result

def insert_kury_items():
    db.init_kurly_item()
    headers = get_headers()
    for page_no in range(1, 100):
        data = get_products(page_no, headers)
        if len(data) == 0:
            break

        for value in data:
            if value['is_sold_out'] == False:
                db.insert_kurly_item(value)

def delete_items_by_keyword():
    for row in db.get_ban_keyword():
        db.delete_item_by_keyword(row['keyword'])

def delete_items_by_ban_list():
    db.delete_item_by_ban_list()

def crawl():
    db.make_connection()
    check_work_availability()
    insert_kury_items()
    delete_items_by_keyword()
    delete_items_by_ban_list()
