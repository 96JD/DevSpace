namespace DevSpace.Helpers;

public class CaseSensitivity
{
	public string FirstWordFirstLetterUpperCase(string text)
	{
		return char.ToUpper(text![0]) + text![1..];
	}
}
