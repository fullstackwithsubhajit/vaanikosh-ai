voicebank-ai/

│
├── app/
│   │
│   ├── api/
│   │   ├── ai/
│   │   ├── transaction/
│   │   ├── history/
│   │   ├── auth/
│   │   └── evaluate/
│   │
│   ├── coach/
│   │   └── page.js
│   │
│   ├── history/
│   │   └── page.js
│   │
│   ├── settings/
│   │   └── page.js
│   │
│   ├── login/
│   │   └── page.js
│   │
│   ├── signup/
│   │   └── page.js
│   │
│   ├── layout.js
│   ├── globals.css
│   └── page.js
│
│
├── components/
│
│   ├── layout/
│   │
│   │   Navbar.jsx
│   │   BottomNav.jsx
│   │   Hero.jsx
│   │
│   ├── voice/
│   │
│   │   MicButton.jsx
│   │   VoiceWave.jsx
│   │   VoiceStatus.jsx
│   │
│   ├── conversation/
│   │
│   │   ConversationFeed.jsx
│   │   ConversationItem.jsx
│   │   TimelineStep.jsx
│   │   UserBubble.jsx
│   │   AssistantBubble.jsx
│   │
│   ├── transaction/
│   │
│   │   RecipientCard.jsx
│   │   RiskCard.jsx
│   │   TransactionSummary.jsx
│   │   AuthenticationCard.jsx
│   │
│   ├── coach/
│   │
│   │   SpendingCard.jsx
│   │   RecommendationCard.jsx
│   │
│   └── ui/
│
│       GlassCard.jsx
│       AnimatedButton.jsx
│       LoadingDots.jsx
│       SectionTitle.jsx
│
│
├── hooks/
│
│   useSpeechRecognition.js
│   useSpeechSynthesis.js
│   useConversation.js
│   useTimeline.js
│
│
├── context/
│
│   ConversationContext.jsx
│   VoiceContext.jsx
│   UserContext.jsx
│
│
├── services/
│
│   aiService.js
│   authService.js
│   transactionService.js
│   historyService.js
│
│
├── lib/
│
│   conversationOrchestrator.js
│   gemini.js
│   db.js
│   riskEngine.js
│   promptManager.js
│   scamKeywords.js
│
│
├── models/
│
│   User.js
│   Transaction.js
│   Chat.js
│   Alert.js
│
│
├── utils/
│
│   formatCurrency.js
│   generateRiskReasons.js
│   helpers.js
│
│
├── public/
│
│   images/
│   icons/
│   audio/
│
│
├── styles/
│
│   animations.css
│
│
└── middleware.js


## Work on these right now (DAY 1)

Navbar ✅ (Done)

Hero

MicButton

VoiceStatus

ConversationTimeline

TimelineStep