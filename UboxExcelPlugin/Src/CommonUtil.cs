using Microsoft.International.Converters.PinYinConverter;
using System;
using System.Text;

namespace Ubox
{
    class CommonUtil
    {
        //中文转为拼音, 需要保证strChinese参数就是中文
        public static string ConvertChineseToPinyin(string strChinese)
        {
            if (string.IsNullOrEmpty(strChinese)) return strChinese;
            try
            {
                StringBuilder fullSpell = new StringBuilder();
                for (int i = 0; i < strChinese.Length; i++)
                {
                    var chr = strChinese[i];
                    fullSpell.Append(GetSpell(chr));
                }

                return fullSpell.ToString();
            }
            catch (Exception e)
            {
                Console.WriteLine("全拼转化出错！" + e.Message);
            }

            return string.Empty;
        }

        //char转换为拼音
        private static string GetSpell(char chr)
        {
            var coverchr = NPinyin.Pinyin.GetPinyin(chr);

            bool isChineses = ChineseChar.IsValidChar(coverchr[0]);
            if (isChineses)
            {
                ChineseChar chineseChar = new ChineseChar(coverchr[0]);
                foreach (string value in chineseChar.Pinyins)
                {
                    if (!string.IsNullOrEmpty(value))
                    {
                        return value.Remove(value.Length - 1, 1);
                    }
                }
            }

            return coverchr;

        }
    }
}
