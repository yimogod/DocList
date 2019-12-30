using System;
using System.Text.RegularExpressions;

namespace Ubox
{
    public class UboxUtil
    {
        //----------------------- 文件格式化 ------------------------
        public static string FormatDate(string src)
        {
            if (src == null || src == "") return "";
            src = src.Replace(" ", "");

            //如果传入的是数字
            int num = 0;
            bool isInt = Int32.TryParse(src, out num);
            if (isInt)
            {
                //41515 这类的数据是因为excel把日期转为int, 从1900年开始的天数
                if (num > 40000 && num < 50000)
                {
                    long oneDay = 24L * 60L * 60L * 1000L * 1000L * 10L;
                    long tick1900 = 1900L * 365L * oneDay;
                    var date = new DateTime(tick1900 + (long)num * oneDay);
                    return date.ToString("yyyy/MM/dd");
                }
            }

            //2016/11/25
            {
                var list = src.Split('/');
                if (list.Length == 3) return src;
            }

            //2016-11-25
            {
                var list = src.Split('-');
                if (list.Length == 3) return src.Replace('-', '/');
            }

            //2013-12-4/2014-2-18
            {
                var list = src.Split('/');
                if (list.Length == 2)
                {
                    return FormatDate(list[1]);
                }
            }

            return src;
        }

        public static string FormatName(string src)
        {
            //去除
            src = src.Replace(" ", "").Replace("，", "").Replace(",", "").Replace("/", "");

            //是否包含汉字
            var bCn = Regex.IsMatch(src, "[\u4e00-\u9fbb]");

            //是否包含英文
            var bEn = Regex.IsMatch(src, "[A-Za-z]");

            //只包含英文, 就直接返回
            if (bEn && !bCn)return src;

            //只包含中文, 需要在前面添加拼音
            if (bCn && !bEn)
            {
                var enSrc = CommonUtil.ConvertChineseToPinyin(src);
                if (string.IsNullOrEmpty(enSrc)) return src;

                //拼音首字符大写
                var list = enSrc.ToCharArray();
                list[0] = char.Parse(enSrc[0].ToString().ToUpper());
                
                //拼音加汉字
                src = new string(list) + src;
                return src;
            }

            return src;
        }
    }
}
