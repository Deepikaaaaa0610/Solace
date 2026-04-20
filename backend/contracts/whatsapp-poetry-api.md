# WhatsApp Poetry API Contract

## Webhook

### `GET /api/webhooks/whatsapp`

- Used for Meta verification challenge.

### `POST /api/webhooks/whatsapp`

- Auth: provider signature
- Purpose: receive inbound WhatsApp events

Example normalized payload:

```json
{
  "providerMessageId": "wamid.HBgMOTE5ODc2NTQzMjEwFQIAERgSODVCRjU3QzQ=",
  "senderPhoneE164": "+919876543210",
  "messageType": "text",
  "messageText": "Dil ko bhi aadat thi safar ki shayad\nGhar mein raha aur raaste likhta raha",
  "receivedAt": "2026-04-09T06:30:00.000Z"
}
```

## Account linking

### `POST /api/account/whatsapp/link/start`

```json
{
  "phoneE164": "+919876543210"
}
```

Response:

```json
{
  "verificationId": "wa_verify_01",
  "status": "pending_verification"
}
```

### `POST /api/account/whatsapp/link/confirm`

```json
{
  "verificationId": "wa_verify_01",
  "otpCode": "123456"
}
```

Response:

```json
{
  "status": "linked",
  "phoneE164": "+919876543210",
  "reconciledSubmissionCount": 2
}
```

## Submission history

### `GET /api/account/submissions`

Response:

```json
{
  "items": [
    {
      "id": "sub_01",
      "title": "Dil ko bhi aadat thi safar ki shayad",
      "status": "pending_review",
      "source": "whatsapp",
      "createdAt": "2026-04-09T06:30:00.000Z"
    }
  ]
}
```

## Public author poems

### `GET /api/authors/:slug/poems`

Response:

```json
{
  "author": {
    "slug": "rahim-falak",
    "displayName": "Rahim Falak"
  },
  "items": [
    {
      "id": "poem_01",
      "title": "Dil ko bhi aadat thi safar ki shayad",
      "body": "Dil ko bhi aadat thi safar ki shayad\nGhar mein raha aur raaste likhta raha",
      "source": "whatsapp",
      "publishedAt": "2026-04-09T08:00:00.000Z"
    }
  ]
}
```

## Moderation

### `GET /api/admin/submissions?status=pending_review`

- Auth: admin or moderator

### `POST /api/admin/submissions/:id/publish`

```json
{
  "note": "Approved for public profile."
}
```

### `POST /api/admin/submissions/:id/reject`

```json
{
  "note": "Rejected as spam."
}
```

### `POST /api/admin/submissions/:id/hold`

```json
{
  "note": "Waiting for editorial review."
}
```
