export const NUTRITION_GOALS = [
  { id:'n1', emoji:'💧', text:'Replace one sugary drink with water each day',        rdNote:'Sugary drinks are the single highest-impact swap for metabolic health.' },
  { id:'n2', emoji:'🥦', text:'Eat at least one green food at every dinner',          rdNote:'Adding vegetables before other foods naturally reduces overall intake.' },
  { id:'n3', emoji:'🍎', text:'Bring a healthy snack from home to school, 3× a week', rdNote:'School environments have limited healthy options — planning ahead helps.' },
];

export const ACTIVITY_GOALS = [
  { id:'a1', emoji:'🚶', text:'Take a 15-minute walk after school',                       rdNote:'Even 15 minutes of low-intensity movement improves insulin sensitivity.' },
  { id:'a2', emoji:'👨‍👩‍👧', text:'Do a fun physical activity together as a family', rdNote:'Family activity builds motivation and makes movement feel social, not clinical.' },
  { id:'a3', emoji:'💃', text:'Do 30 minutes of movement I actually enjoy',               rdNote:'Intrinsic enjoyment is the strongest predictor of long-term activity.' },
];

export const FREQUENCIES = [
  { label:'Every day',   short:'daily'   },
  { label:'5× / week',  short:'5×/week' },
  { label:'4× / week',  short:'4×/week' },
  { label:'3× / week',  short:'3×/week' },
  { label:'2× / week',  short:'2×/week' },
  { label:'Once / week', short:'1×/week' },
];

export const CONFIDENCE = [
  { emoji:'😬', label:'Not sure',  val:1 },
  { emoji:'😐', label:'Maybe',     val:2 },
  { emoji:'🙂', label:'Think so',  val:3 },
  { emoji:'😊', label:'Probably',  val:4 },
  { emoji:'💪', label:'Totally!',  val:5 },
];

export const CAT_INFO = {
  nutrition: { color:'#005F73', light:'#E6F2F5', label:'🥗 Nutrition Goal' },
  activity:  { color:'#FF8C76', light:'#FFF0ED', label:'🏃 Activity Goal'  },
};
