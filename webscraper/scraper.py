from selenium import webdriver
from selenium.webdriver.firefox.options import Options
from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
import requests
import time

# source .venv/Scripts/activate

# pip install selenium
# uv pip install requests
# uv pip install beautifulsoup4
# uv pip install lxml

def scrape(soup):

    result = []

    data_list = soup.find('ul', id='data-list')
    lists = data_list.find_all('li')

    for row in lists:
        list_divs = row.find_all('div')
        name = list_divs[2].p.text.strip().replace('\n', "")
        winrate = list_divs[4].text.strip().replace('\n', "")
        pickrate = list_divs[5].text.strip().replace('\n', "")
        banrate = list_divs[6].text.strip().replace('\n', "")
        result.append(name + '\n' + winrate + '\n' + pickrate + '\n' + banrate + '\n\n')

    result[-1] = result[-1].rstrip('\n')
    return "".join(result)

    # 德玛西亚之力
    # 55.64%
    # 36.15%
    # 18.12%
    #
    # 正义天使
    # 55.07%
    # 5.05%
    # 1.17%

def click_buttons():

    # Desired URL
    url = "https://lolm.qq.com/act/a20220818raider/index.html"

    # create a new Firefox session

    opts = Options()
    opts.add_argument("--headless")
    driver = webdriver.Firefox(options=opts)
    driver.implicitly_wait(10)
    driver.get(url)

    classes = ["btn-place-top", "btn-place-jungle", "btn-place-mid", "btn-place-bot", "btn-place-sup"]
    files = ['../backend/rawChampionsData/baron.txt', '../backend/rawChampionsData/jungle.txt', '../backend/rawChampionsData/mid.txt', '../backend/rawChampionsData/bottom.txt', '../backend/rawChampionsData/support.txt']

    for i in range(len(classes)):
        python_button = driver.find_element(By.CLASS_NAME, classes[i])
        python_button.click() #click load more button
        time.sleep(5)
        soup=BeautifulSoup(driver.page_source)
        role = scrape(soup)

        with open(files[i], 'w', encoding='utf-8') as data:
            data.write(role)

if __name__ == '__main__':
    click_buttons()
    