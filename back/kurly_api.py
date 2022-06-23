import db
import json

def get(params):
    db.make_connection()
    kurly_list = []
    for row in db.get_kurly_items():
        kurly_list.append({
            'no': row['no'], 
            'name': row['name'], 
            'price': row['price'], 
            'discount_percent': row['discount_percent'], 
            'desc': row['desc'], 
            'img': row['img'], 
            'sticker': row['sticker']})

    return json.dumps({'kurlyTimeSaleData': kurly_list, 'lastestCrawlDate': db.get_latest_deal_info('crawl')['deal_date']})

def delete(params):
    print(params)
    db.make_connection()
    db.delete_kurly_items(params['no'])

    return json.dumps({'result': 'ok'})

def add_ban_keyword(params):
    print(params)
    
    if ('ban_keyword' in params):
        ban_keyword = params['ban_keyword']
        db.make_connection()
        db.insert_ban_keyword(ban_keyword)
        db.delete_item_by_keyword(ban_keyword)

    return json.dumps({'result': 'ok'})