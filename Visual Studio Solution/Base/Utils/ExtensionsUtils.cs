using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Tridion.ContentManager;

namespace Tridion.Extensions.Utils
{
    public class ExtensionsUtils
    {

        public static String GetTemporaryFilePath() {             
            string dir = Path.GetTempPath();
            string filename = Path.Combine(dir, Path.GetTempFileName());            
            return filename;
        
        }
        public static double ToJavascriptTime(string cSharpDate)
        {

            DateTime d1 = new DateTime(1970, 1, 1);
            DateTime d2 = DateTime.Parse(cSharpDate);
            TimeSpan ts = new TimeSpan(d2.Ticks - d1.Ticks);
            return ts.TotalMilliseconds;

        }

        public static double ToJavascriptTime(DateTime cSharpDate)
        {

            DateTime d1 = new DateTime(1970, 1, 1);
            TimeSpan ts = new TimeSpan(cSharpDate.Ticks - d1.Ticks);
            return ts.TotalMilliseconds;

        }

        public static DateTime ToCSharpTime(double time)
        {
            TimeSpan ts = TimeSpan.FromMilliseconds(time);
            DateTime d1 = new DateTime(1970, 1, 1);
            d1 = d1.Add(ts);
            return d1;

        }

        public static DateTime FirstHourOfDay()
        {
            DateTime dateTime = DateTime.Now;
            return new DateTime(dateTime.Year, dateTime.Month, dateTime.Day, 0, 0, 0);
        }

        public static DateTime LastHourOfDay()
        {
            DateTime dateTime = DateTime.Now;
            return new DateTime(dateTime.Year,  dateTime.Month, dateTime.Day, 23, 59, 59);
        }


        public static DateTime FirstDayOfYear()
        {
            DateTime dateTime = DateTime.Now;
            return new DateTime(dateTime.Year, 1, 1);
        }

        public static DateTime LastDayOfYear()
        {
            DateTime dateTime = DateTime.Now;
            return new DateTime(dateTime.Year, 12, 31, 23, 59, 59);
        }


        public static DateTime FirstDayOfMonth()
        {
            DateTime dateTime = DateTime.Now;
            return new DateTime(dateTime.Year, dateTime.Month, 1);
        }

        public static DateTime LastDayOfMonth()
        {
            DateTime dateTime = DateTime.Now;
            DateTime firstDayOfTheMonth = new DateTime(dateTime.Year, dateTime.Month, 1);
            return firstDayOfTheMonth.AddMonths(1).AddDays(-1);
        }

        public static DateTime FirstDayOfWeek()
        {
            DateTime dt = DateTime.Now;
            DateTime wkStDt = DateTime.MinValue;
            wkStDt = dt.AddDays(1 - Convert.ToDouble(dt.DayOfWeek));
            return wkStDt;
        }

        public static DateTime LastDayOfWeek()
        {
            DateTime dt = DateTime.Now;
            DateTime wkEndDt = DateTime.MinValue;
            wkEndDt = dt.AddDays(7 - Convert.ToDouble(dt.DayOfWeek));
            return wkEndDt;
        }

        public static DateTime JulianToDateTime(int julianDate)
        {
            int RealJulian = julianDate + 1900000;
            int Year = Convert.ToInt32(RealJulian.ToString().Substring(0, 4));
            int DoY = Convert.ToInt32(RealJulian.ToString().Substring(4));
            DateTime dtOut = new DateTime(Year, 1, 1);
            return dtOut.AddDays(DoY - 1);
        }

        

        public static TcmUri GetURIInContenxt(string itemURI, string publicationURI) {
            TcmUri itURI = new TcmUri(itemURI);
            TcmUri pubURI = new TcmUri(publicationURI);
            return new TcmUri(itURI.ItemId, itURI.ItemType, pubURI.ItemId);
        }
        
    }
}
