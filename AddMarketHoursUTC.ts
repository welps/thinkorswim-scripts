# AddMarketHoursUTC adds vertical lines on market open/close for designated market
# marketOpen - UTC time the market opens
# marketClose - UTC time the market closes
# marketName - name of market
# lineColor - Only way user can supply color, I think: https://tlc.thinkorswim.com/center/reference/thinkScript/Functions/Look---Feel/GetColor
# isDST - TOS unfortunately is pinned to eastern time so we need to know if daylight saving time is in place to offset for UTC
input marketOpen = 1330;
input marketClose = 2000;
input marketName = "USA";
input lineColor = 0;
input isDST = yes;

# This commented code figure outs whether or not daylight savings time is in place by checking if marketStart is 1220 or 1320
# However thinkScript does not allow non-constant values to be supplied in the SecondsTillTime 'tillTime' argument

# RegularTradingStart(20200424) in EDT reports 1587471600000 or 1220
# RegularTradingStart(20200302) in EST reports 1583155200000 or 1320
#def MILLISECONDS_IN_SECOND = 1000;
#def SECONDS_IN_DAY = 86400;
#def SECONDS_IN_HOUR = 3600;
#def usaStart = ((RegularTradingStart(GetYYYYMMDD()) / MILLISECONDS_IN_SECOND) % SECONDS_IN_DAY) / SECONDS_IN_HOUR; 
#def easternOffset = if usaStart > 13 then 0500 else 0400;
def easternOffset = if isDST then 0400 else 0500;

# TOS does not properly handle modulo operations with negative numbers (-500%2400) 
def TIME_BOUND = 2400;
def mktOpen = (marketOpen - easternOffset) % TIME_BOUND;
def adjustedOpen = if mktOpen < 0 then mktOpen + TIME_BOUND else mktOpen;
def mktClose = (marketClose - easternOffset) % TIME_BOUND;
def adjustedClose = if mktClose < 0 then mktClose + TIME_BOUND else mktClose;

def isOpen = SecondsTillTime(adjustedOpen) == 0;
def isEnd = SecondsTillTime(adjustedClose) == 0;

# Upper/lower case to make it more visually distinguishable
AddVerticalLine(isOpen, Concat(marketName, Concat("     M A R K E T  O P E N  -  ", AsText(GetYYYYMMDD()))), GetColor(lineColor), Curve.MEDIUM_DASH);
AddVerticalLine(isEnd, Concat(marketName, Concat(" mkt close - ", AsText(GetYYYYMMDD()))), GetColor(lineColor), Curve.POINTS);