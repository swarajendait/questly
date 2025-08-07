
# Questly

**Questly** is a desktop application designed to provide users with AI-generated, category-based daily challenges to help them develop and refine skills in a structured and goal-oriented manner. It uses Electron for the desktop interface and Together AI for generating meaningful content.

---

## Features

- Daily AI-generated challenges based on selected categories  
- Clean and minimal Electron-based interface  
- Uses Together AI (via API) for challenge generation  
- Environment-based API key setup for secure usage  
- Open-source and developer-friendly

---

## Installation

1. Clone the repository:
```
git clone https://github.com/swarajendait/questly.git  
cd questly  
```

2. Install dependencies:
```
npm install  
```

3. Create a `.env` file in the root directory:
```  
TOGETHER_API_KEY=your_api_key_here  
```  
> You can obtain a free API key by signing up at [https://platform.together.xyz](https://platform.together.xyz)

4. Start the application:
```  
npm run dev  
```

---

## Usage

- Launch the app  
- Choose a category or generate one using AI  
- Receive daily challenges and track progress  

---

## Disclaimer

This project uses a rate-limited, read-only API. Please avoid abusing the key to prevent throttling. Each user should use their own API key for uninterrupted experience.

---

## Contributing

If you'd like to contribute, feel free to fork the repo and submit a pull request. All improvements are welcome.
