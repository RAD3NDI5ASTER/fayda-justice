package model

type Case struct {
    ID      string `json:"id"`
    Region  string `json:"region"`
    Type    string `json:"type"`
    Status  string `json:"status"`
    Citizen string `json:"citizen"`
    Officer string `json:"officer"`
    Locked  bool   `json:"locked"`
}
