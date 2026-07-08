INSERT INTO public.challenges_catalog (title, description, duration_minutes, difficulty, icon_emoji, xp_base, is_active) VALUES
('Dishwasher Unload', 'Unload a full dishwasher into cabinets', 5, 'easy', '🍽️', 50, true),
('Grocery Unload', 'Unload groceries and put them away', 6, 'easy', '🛒', 50, true),
('Fold Laundry', 'Fold a basket of clean laundry', 7, 'medium', '🧺', 60, true),
('Make Bed', 'Make your bed from start to finish', 3, 'easy', '🛏️', 40, true),
('Reset Table', 'Clear and reset the dining table', 4, 'easy', '🍴', 45, true),
('Carry Laundry Basket', 'Carry a laundry basket between rooms', 3, 'easy', '🧺', 40, true),
('Organize Shelf', 'Organize items on a shelf', 6, 'medium', '📚', 60, true),
('Handle Fragile Items', 'Carefully move fragile items', 5, 'medium', '🥂', 65, true),
('Trash & Recycling Sort', 'Sort trash and recycling into bins', 4, 'easy', '♻️', 50, true),
('Task Transitions', 'Transition smoothly between tasks', 5, 'medium', '🔀', 55, true)
ON CONFLICT DO NOTHING;