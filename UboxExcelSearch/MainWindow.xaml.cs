using Microsoft.Win32;
using System.Collections.Generic;
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
			var txt = txtSearch.Text;
			if (string.IsNullOrWhiteSpace(txt))
			{
				MessageBox.Show("输入正确的查询内容!");
				return;
			}

			//保存查询值
			var key = ReadRegistryKey();
			if (key == null) return;
			key.SetValue("SearchContent", txt);


			var path = GetValidPath(txtPath.Text);
			if (path == null)
			{
				MessageBox.Show("请先设置 Excel 所在目录!");
				return;
			}

			excelList.Clear();
			DirectoryInfo root = new DirectoryInfo(path);
			GetExcelFiles(root);
			var n = excelList.Count;
		}

		private void ListView_SelectionChanged(object sender, System.Windows.Controls.SelectionChangedEventArgs e)
		{

		}

		private void btnSet_Click(object sender, RoutedEventArgs e)
		{
			var path = GetValidPath(txtPath.Text);
			if (path != null)
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
			if (!string.IsNullOrWhiteSpace(value))
			{
				txtPath.Text = value;
			}

			value = key.GetValue("SearchContent") as string;
			if (!string.IsNullOrWhiteSpace(value))
			{
				txtSearch.Text = value;
			}
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

		private string GetValidPath(string path)
		{
			bool validFolder = Directory.Exists(path);

			bool validFile = File.Exists(path);
			if (validFile)
			{
				path = Path.GetDirectoryName(path);
				validFolder = Directory.Exists(path);
			}

			if (validFolder) return path;
			return null;
		}

		private List<FileInfo> excelList = new List<FileInfo>();
		private void GetExcelFiles(DirectoryInfo root)
		{
			var folders = root.GetDirectories();
			foreach (var folder in folders)
			{
				GetExcelFiles(folder);
			}

			var files = root.GetFiles();
			foreach (FileInfo f in files)
			{
				if (f.Extension.Equals(".xlsx")) excelList.Add(f);
			}
		}
	}
}
