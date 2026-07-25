const SCAM_RULES = {
  banking: [
    "bank manager",
    "customer care",
    "rbi",
    "kyc",
    "account freeze",
    "verification team",
    "bank officer",
  ],

  urgency: [
    "urgent",
    "immediately",
    "right now",
    "within 5 minutes",
    "quickly",
    "last chance",
  ],

  otp: [
    "otp",
    "verification code",
    "pin",
    "share pin",
    "share otp",
  ],

  remoteAccess: [
    "anydesk",
    "teamviewer",
    "rustdesk",
    "screen share",
    "remote access",
  ],

  investment: [
    "double money",
    "guaranteed return",
    "crypto investment",
    "profit scheme",
    "100% return",
  ],

  secrecy: [
    "don't tell anyone",
    "keep secret",
    "don't inform family",
  ],

  emotional: [
    "hospital",
    "accident",
    "emergency",
    "need money immediately",
  ],
};


export function detectScamSignals(conversation) {
        {
    score,
    level,
    reasons
    }
}