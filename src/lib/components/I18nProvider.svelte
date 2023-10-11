<script lang="ts" context="module">
	export const LANGUAGES = ['finnish', 'swedish', 'english', 'turku'] as const;
	export type Language = (typeof LANGUAGES)[number];
	export type TKey = keyof typeof TRANSLATIONS;

	const TRANSLATIONS = {
		'matkustajan.toiminta': {
			finnish: 'Matkustajan toiminta',
			english: 'Passenger operation',
			swedish: 'Resenär operation',
			turku: 'Matkustaja tila'
		},
		'soita.mokille': {
			finnish: 'soita mökille, paina -painiketta',
			english: 'to call the cabin, press the button',
			swedish: 'för att kalla till kabinen, knappa',
			turku: 'et sä mökil halu soitta? pain täst'
		},
		taso: {
			finnish: 'Taso',
			english: 'Level',
			swedish: 'Läge',
			turku: 'Kerros'
		},
		fin: {
			finnish: 'SUO',
			english: 'FIN',
			swedish: 'FIN',
			turku: 'SUA'
		},
		swe: {
			finnish: 'RUO',
			english: 'SWE',
			swedish: 'SVE',
			turku: 'RUA'
		},
		eng: {
			finnish: 'ENG',
			english: 'ENG',
			swedish: 'ENG',
			turku: 'ENK'
		},
		tku: {
			finnish: 'TUR',
			english: 'TKU',
			swedish: 'ÅBO',
			turku: 'TUR'
		},
		guruMeditation: {
			finnish:
				'Pehmyttavara Virhe.   Kolise tablettia 🫱 hieman jatkoksi.\nGuru Meditaatio #0000000B.00002017',
			english:
				'Software Failure.   Slap the pad 🫱 a bit to continue.\nGuru Meditation #0000000B.00002017',
			swedish:
				'Mjukvara Fel.   Slappa pädden 🫱 lite för fortsättning.\nGuru Meditation #0000000B.00002017',
			turku:
				"Ohjelmav'Virhe.   Läppäse tät tapletti 🫱 hiema jatkaakses.\nViksu ihmise miätinnät #0000000B.00002017"
		}
	} satisfies Record<string, Record<Language, string>>;

	export type I18nContext = {
		language: Writable<Language>;
		nextLanguage: Readable<Language>;
		t: Readable<(t: TKey) => string>;
	};
</script>

<script lang="ts">
	import { setContext } from 'svelte';

	import { writable, type Readable, type Writable, derived } from 'svelte/store';

	const language = writable<Language>('finnish');
	setContext<I18nContext['language']>('language', language);
	setContext<I18nContext['nextLanguage']>(
		'nextLanguage',
		derived(language, (lang) => LANGUAGES[(LANGUAGES.indexOf(lang) + 1) % LANGUAGES.length])
	);
	setContext<I18nContext['t']>(
		't',
		derived(language, (lang) => (t: TKey) => TRANSLATIONS[t][lang])
	);
</script>

<slot />
