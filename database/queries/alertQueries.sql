-- Get recent alerts
SELECT * FROM Alerts ORDER BY created_at DESC LIMIT 10;

-- Get active alerts
SELECT * FROM Alerts WHERE status = 'ACTIVE' ORDER BY created_at DESC;

-- Update alert status to resolved
UPDATE Alerts SET status = 'RESOLVED', resolved_at = CURRENT_TIMESTAMP WHERE id = ?;

-- Trigger a new alert
INSERT INTO Alerts (code_type, floor, ward, room, notes, initiator_id) 
VALUES ('CODE BLUE', '2nd Floor', 'ICU', '205', 'Cardiac Arrest', 1);
