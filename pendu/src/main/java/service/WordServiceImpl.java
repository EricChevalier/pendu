package service;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class WordServiceImpl implements WordService {

	private List<String> lstWords;
	private static WordService instance = null;

	public static WordService getInstance() {
		if (instance == null) {
			instance = new WordServiceImpl();
		}
		return instance;
	}

	private WordServiceImpl() {
		this.lstWords = new ArrayList<String>();

		// remplissage de la liste de mots
		FileReader input = null;
		try {
			input = new FileReader("D:/workspace/pendu/mots_francais.txt");
		} catch (FileNotFoundException e1) {
			e1.printStackTrace();
		}

		BufferedReader bufRead = new BufferedReader(input);
		String currentWord = null;

		try {
			while ((currentWord = bufRead.readLine()) != null) {

				this.lstWords.add(currentWord);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public String getRandomWord() {
		return this.lstWords.get(getRandomIndex());
	}

	public void addWord(String word) {
		this.lstWords.add(word);

	}

	private Integer getRandomIndex() {
		Random rand = new Random();
		int index = 0;

		index = rand.nextInt(this.lstWords.size());
		return index;
	}

}
