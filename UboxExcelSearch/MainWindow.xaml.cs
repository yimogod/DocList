using Microsoft.Win32;
using System.IO;
using System.Windows;

namespace UboxSearch
{
	/// <summary>
	/// Interaction logic for MainWindow.xaml
	/// </summary>
	public partial class MainWindow : Window
	{
		public MainWindow()
		{
			InitializeComponent();
		}

		//查询按钮点击
		private void btnSearch_Click(object sender, RoutedEventArgs e)
		{

		}

		private void ListView_SelectionChanged(object sender, System.Windows.Controls.SelectionChangedEventArgs e)
		{

		}

		private void btnSet_Click(object sender, RoutedEventArgs e)
		{
			var path = txtPath.Text;
			bool validFolder = Directory.Exists(path);

			bool validFile = File.Exists(path);
			if (validFile)
			{
				path = Path.GetDirectoryName(path);
				validFolder = Directory.Exists(path);
			}

			if (validFolder)
			{
				var key = ReadRegistryKey();
				if (key == null) return;
				key.SetValue("ExcelPath", path);
				MessageBox.Show($"设置路径成功 {path}");
				return;
			}

			MessageBox.Show("输入合法的目录地址!");
		}

		private void Window_Initialized(object sender, System.EventArgs e)
		{
			var key = ReadRegistryKey();
			if (key == null) return;

			var value = key.GetValue("ExcelPath") as string;
			if (string.IsNullOrEmpty(value)) return;

			txtPath.Text = value;
		}

		private RegistryKey ReadRegistryKey()
		{
			var keyRoot = Registry.CurrentUser.OpenSubKey(@"Software\ExcelSearch", true) ??
					   Registry.CurrentUser.CreateSubKey(@"Software\ExcelSearch");
			if (keyRoot == null)
			{
				MessageBox.Show("无法读取注册表.联系开发者!");
				return null;
			}

			return keyRoot;
		}
	}
}
