                                            ONE-ORDER BUTTERWORTH  DIGITAL FILTER IN JAVASCRIPT

This brief documentation shows how to use the filter JavaScript library. The repository contains the source code in “filter.js” and the minified version in “filter.min.js”. 

Copy the minified version into your JS folder or whatever folder where you keep your script files. Declare the script dependencies in the bottom of your HTML code using the script tag. 
Then in your code, you can use the filter simply by writing this one-line code. 

          var outputArray=one_order_butterworth_filter(Wn,inputArray);
                  • Wn – Cut-off frequency( 0 < Wn < 1.0 )
                  • inputArray – it should be a non-zero element array of any length (it throws an error if input array is invalid)
                  • outputArray- output result of the input signal
