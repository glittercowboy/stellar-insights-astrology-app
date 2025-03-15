def convert_time_string(time_str: str) -> tuple:
    """Convert time string (HH:MM) to hours and minutes"""
    if not time_str:
        return 12, 0  # Default to noon if no time provided
    
    try:
        hours, minutes = map(int, time_str.split(':'))
        return hours, minutes
    except (ValueError, AttributeError):
        # Handle invalid time format
        return 12, 0  # Default to noon
