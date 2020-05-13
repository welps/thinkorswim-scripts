# thinkorswim scripts (studies)

Scripts for [thinkorswim](https://www.tdameritrade.com/tools-and-platforms/thinkorswim/) trading platform. 

## [AddMarketHoursUTC](AddMarketHoursUTC.ts)

Adds visual line on chart for given open/close hours (in UTC). Helpful to see which markets / areas price movements may be originating.

Unfortunately thinkscript is pegged to eastern time and therefore affected by daylight saving time. A flag is provided to denote this. There is commented code to intuit whether or not there is daylight saving time, but thinkscript's `SecondsTillTime` does not accept the output of a function call. 

**Visual example**

![Visual of vertical lines for AddMarketHoursUTC](images/addmarkethours-chart.png)

**Configuration example**

![Visual of configuration for AddMarketHoursUTC](images/addmarkethours-config.png)

## [AfterHoursRelativePriceMovement](AfterHoursRelativePriceMovement.ts)

Tracks the price difference from afterhour volume relative to yesterday's close

This was created to visually confirm if certain stock prices were primarily driven from afterhour movements over longer periods of time

Can be overlaid with AddMarketHoursUTC to visually see correlation from international market open/closes

**Visual example**

![Visual for AfterHoursRelativePriceMovement](images/afterhoursprice-chart.png)
