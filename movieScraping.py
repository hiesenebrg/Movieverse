from selenium import webdriver
from selenium.webdriver.common.by import By

# Set up the Selenium webdriver
driver = webdriver.Chrome()

# Navigate to the website
driver.get("https://www.sacnilk.com/entertainmenttopbar/Box_Office_Collection?hl=en")

# Find all the movie elements
movie_elements = driver.find_element(By.CSS_SELECTOR, ".table")
# Find all the movie rows
movie_rows = movie_elements.find_elements(By.TAG_NAME, "tr")

# Create an empty list to store movie names
movie_names = []
movie_links = []
collection_details = {}
current_movie = 'Deadpool & Wolverine'
# Iterate over each movie row
for movie_row in movie_rows[1:]:
    # Find the movie name element
    td_tag = movie_row.find_element(By.TAG_NAME, "td")
    movie_link_element = td_tag.find_element(By.TAG_NAME, "a")
    movie_name_element = movie_link_element.find_element(By.TAG_NAME, "b")
    # Extract the movie name
    movie_name = movie_name_element.text
    movie_names.append(movie_name)
    movie_links.append(movie_link_element.get_attribute("href"))
    if(current_movie == movie_name):
        movie_link_element.click()
        
        # Wait for the page to load
        driver.implicitly_wait(5)
        
        collections = driver.find_elements(By.CSS_SELECTOR, ".boxofficecollection")
        for collection in collections:
            table = collection.find_element(By.TAG_NAME, "table")
            table_rows_day = table.find_elements(By.TAG_NAME, "tr")[0]
            table_rows_money = table.find_elements(By.TAG_NAME, "tr")[1]
            per_day_collection_arr = table_rows_money.find_elements(By.TAG_NAME, "td")
            money = {}
            for day, money_value in zip(table_rows_day.find_elements(By.TAG_NAME, "th")[1:], per_day_collection_arr[1:]):
                money[day.text] = money_value.text
            print(money)
            
        # Go back to the previous page
        collection_details[movie_name] = money
        driver.back()
    
    # Append the movie name to the list
   
    # Get the link to the movie's collection page
    # movie_link = movie_name_element.get_attribute("href")
    
    # TODO: Do something with the movie link
 
# Print the movie names
# print("Movie Names:")
for movie_name in movie_links:
    print(movie_name)
# print('movie_elements',movie_elements)
# # Iterate over each movie element
# for movie_element in movie_elements:
#     # Extract the movie name
#     movie_name = movie_element.find_element(By.CSS_SELECTOR, ".td").text
    
#     # Click on the movie element to go to the movie's page
#     movie_element.click()
    
#     # Wait for the page to load
#     driver.implicitly_wait(5)
    
#     # Find the daily collection element
#     daily_collection_element = driver.find_element(By.CSS_SELECTOR, ".daily-collection")
    
#     # Extract the daily collection
#     daily_collection = daily_collection_element.text
    
#     # Print the movie name and daily collection
#     print(f"Movie: {movie_name}")
#     print(f"Daily Collection: {daily_collection}")
    
#     # Go back to the previous page
#     driver.back()

# Close the browser
driver.quit()
# from boxoffice_api import BoxOffice 
# # box_office = BoxOffice(api_key="723032") # Get daily box office information for a specific date 
# box_office = BoxOffice()
# # box_office = BoxOffice(outputformat="DF")
# daily_data = box_office.get_daily("2024-07-31")
# print('daily_data:', daily_data)
