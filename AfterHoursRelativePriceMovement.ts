# AfterHoursRelativePriceMovement tracks the price difference from afterhour volume relative to yesterday's close

# This was created so I could eyeball if certain stock prices were primarily driven from afterhour movements over longer periods of time
# Can be overlaid with AddMarketHoursUTC to visually see correlation from international market open/closes

# Inputting Market Hours is required due to thinkscript's date function limitations
input marketOpen = 0930;
input marketClose = 1600;

# AFAIK there is no better way to do this due to SecondsTillTime rolling over after midnight, lack of real date math, and the mish-mash of UTC/EST time handling from thinkscript
def isClosedMorning = if SecondsTillTime(marketOpen) > 0 then yes else no;
def isClosedNight = if SecondsTillTime(marketClose) < 0 then yes else no;

def change = if !isClosedMorning AND !isClosedNight then 0 else change[1] + (hl2 - hl2[1]); 

plot yesterdayPrice = 0;

plot priceDifference = if change != 0 then change else Double.NaN;
priceDifference.AssignValueColor(if priceDifference > 0 then Color.UPTICK else if priceDifference < 0 then Color.DOWNTICK else Color.GRAY);

# This is to visually encapsulate a week because weekend price movements can be funky
def isStartOfWeek = if GetDayOfWeek(GetYYYYMMDD()) == 1 then yes else no;
def isEndOfWeek = if GetDayOfWeek(GetYYYYMMDD()) == 5 then yes else no;

AddVerticalLine(isStartOfWeek AND SecondsTillTime(marketOpen) == 0, "Monday Open", Color.GREEN);
AddVerticalLine(isEndOfWeek AND SecondsTillTime(marketClose) == 0, "Friday Close", Color.RED);