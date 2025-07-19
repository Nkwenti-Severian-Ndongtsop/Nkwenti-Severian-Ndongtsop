
import requests
import json

# CONFIGURE YOUR LEEETCODE USERNAME HERE
LEETCODE_USERNAME = "Nkwenti_Severian_Ndongtsop"

API_URL = "https://leetcode.com/graphql"
QUERY = '''
query getUserProfile($username: String!) {
  allQuestionsCount {
    difficulty
    count
  }
  matchedUser(username: $username) {
    username
    profile {
      realName
      ranking
      userAvatar
      countryName
      reputation
      starRating
    }
    submitStatsGlobal {
      acSubmissionNum {
        difficulty
        count
        submissions
      }
    }
  }
}
'''

def fetch_leetcode_stats(username):
    variables = {"username": username}
    response = requests.post(API_URL, json={"query": QUERY, "variables": variables})
    response.raise_for_status()
    data = response.json()
    if "errors" in data:
        raise Exception(f"LeetCode API error: {data['errors']}")
    return data["data"]


TOTAL_USERS_PLACEHOLDER = 5000000

def main():
    stats = fetch_leetcode_stats(LEETCODE_USERNAME)
    stats["totalUsers"] = TOTAL_USERS_PLACEHOLDER
    with open("card/stats.json", "w") as f:
        json.dump(stats, f, indent=2)
    print("LeetCode stats fetched and saved to card/stats.json")

if __name__ == "__main__":
    main() 