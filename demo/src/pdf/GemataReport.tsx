import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { kpiMetrics } from '../data/kpi-data'
import { LAYERS } from '../data/architecture'
import { milestones } from '../data/roadmap'
import { techStackCards } from '../data/tech-stack'

const styles = StyleSheet.create({
  page: { backgroundColor: '#0a0a0f', color: '#e2e8f0', fontFamily: 'Helvetica', padding: 40, fontSize: 10 },
  cover: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 36, fontFamily: 'Helvetica-Bold', color: '#f59e0b', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#94a3b8', marginBottom: 4 },
  date: { fontSize: 10, color: '#475569', marginTop: 24 },
  divider: { borderBottomWidth: 1, borderBottomColor: '#2a2a4a', marginVertical: 16 },
  h1: { fontSize: 20, fontFamily: 'Helvetica-Bold', color: '#f59e0b', marginBottom: 12, marginTop: 24 },
  h2: { fontSize: 14, fontFamily: 'Helvetica-Bold', color: '#e2e8f0', marginBottom: 8, marginTop: 16 },
  p: { fontSize: 10, color: '#94a3b8', lineHeight: 1.6, marginBottom: 8 },
  row: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  card: { flex: 1, backgroundColor: '#1a1a2e', borderWidth: 1, borderColor: '#2a2a4a', borderRadius: 6, padding: 10 },
  cardTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: '#e2e8f0', marginBottom: 4 },
  cardText: { fontSize: 9, color: '#64748b', lineHeight: 1.4 },
  bullet: { flexDirection: 'row', marginBottom: 4 },
  bulletDot: { color: '#f59e0b', marginRight: 6, fontFamily: 'Helvetica-Bold' },
  bulletText: { flex: 1, fontSize: 10, color: '#94a3b8', lineHeight: 1.5 },
  milestoneBox: { backgroundColor: '#1a1a2e', borderRadius: 6, padding: 10, marginBottom: 8, borderLeftWidth: 3 },
  phaseNum: { fontSize: 12, fontFamily: 'Helvetica-Bold', marginBottom: 4 },
  phaseWeeks: { fontSize: 9, color: '#64748b', marginBottom: 6 },
})

export function GemataReport() {
  return (
    <Document title="GEMATA AIOS — Relazione Strategica" author="Giorgio — Todesco Srl">
      {/* Cover page */}
      <Page size="A4" style={styles.page}>
        <View style={styles.cover}>
          <Text style={styles.title}>GEMATA AIOS</Text>
          <Text style={styles.subtitle}>AI Operating System — Gruppo Gemata</Text>
          <Text style={{ fontSize: 12, color: '#64748b', marginTop: 8 }}>Relazione Strategica di Implementazione</Text>
          <View style={[styles.divider, { width: 200, marginTop: 32 }]} />
          <Text style={{ fontSize: 10, color: '#475569' }}>Gemata SpA · Todesco Srl · Rollmac · COS.T.A.</Text>
          <Text style={styles.date}>Giugno 2026 — Giorgio, Todesco Srl</Text>
        </View>
      </Page>

      {/* Executive Summary */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.h1}>Executive Summary</Text>
        <Text style={styles.p}>
          GEMATA AIOS è un AI Operating System costruito su Claude Code che trasforma l&apos;intelligenza artificiale
          da semplice assistente conversazionale in un sistema operativo aziendale completo per il Gruppo Gemata.
        </Text>
        <Text style={styles.p}>
          Il sistema è composto da 5 layer funzionali: ContextOS (contesto aziendale persistente),
          DataOS (pipeline KPI in tempo reale), IntelOS (intelligence su meeting e comunicazioni),
          AutomateOS (automazione task e produttività), e Build (strumenti di costruzione e innovazione).
        </Text>
        <Text style={styles.p}>
          L&apos;implementazione completa richiede 12 settimane suddivise in 4 fasi, con valore operativo
          disponibile già dalla Fase 1 (ContextOS, 1–2 giorni).
        </Text>

        <Text style={styles.h2}>I 5 Layer AIOS</Text>
        {LAYERS.map(layer => (
          <View key={layer.id} style={styles.bullet}>
            <Text style={styles.bulletDot}>▸</Text>
            <Text style={styles.bulletText}>
              <Text style={{ fontFamily: 'Helvetica-Bold', color: '#e2e8f0' }}>Layer {layer.id} — {layer.fullName}:</Text>{' '}{layer.description}
            </Text>
          </View>
        ))}

        <Text style={styles.h2}>KPI Demo — Giugno 2026</Text>
        <View style={[styles.row, { flexWrap: 'wrap' }]}>
          {kpiMetrics.map(m => (
            <View key={m.label} style={[styles.card, { minWidth: '30%', maxWidth: '32%' }]}>
              <Text style={styles.cardTitle}>{m.value} {m.unit}</Text>
              <Text style={styles.cardText}>{m.label}</Text>
            </View>
          ))}
        </View>
      </Page>

      {/* Architecture */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.h1}>Architettura del Sistema</Text>
        <Text style={styles.p}>
          Claude Code funge da orchestratore centrale. Ogni layer viene attivato tramite comandi slash
          personalizzati e skill del framework Superpowers. Il contesto aziendale viene caricato
          automaticamente all&apos;avvio di ogni sessione tramite il file CLAUDE.md.
        </Text>
        {LAYERS.map(layer => (
          <View key={layer.id} style={[styles.milestoneBox, { borderLeftColor: layer.color }]}>
            <Text style={[styles.phaseNum, { color: layer.color }]}>Layer {layer.id} — {layer.name}</Text>
            <Text style={styles.p}>{layer.description}</Text>
          </View>
        ))}
        <Text style={styles.p}>
          L&apos;Automation Layer coordina cron job Python che aggiornano i KPI ogni mattina,
          processano note di riunione e inviano digest settimanali automatici.
        </Text>
      </Page>

      {/* Tech Stack */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.h1}>Stack Tecnologico</Text>
        {(['frontend', 'ai', 'data', 'infra'] as const).map(cat => {
          const catLabels = { frontend: 'Frontend', ai: 'AI & Orchestration', data: 'Data Pipeline', infra: 'Infrastructure' }
          const cards = techStackCards.filter(c => c.category === cat)
          return (
            <View key={cat}>
              <Text style={styles.h2}>{catLabels[cat]}</Text>
              <View style={[styles.row, { flexWrap: 'wrap' }]}>
                {cards.map(c => (
                  <View key={c.name} style={[styles.card, { minWidth: '45%', marginBottom: 6 }]}>
                    <Text style={styles.cardTitle}>{c.name} {c.version !== '-' ? `v${c.version}` : ''}</Text>
                    <Text style={styles.cardText}>{c.purpose}</Text>
                  </View>
                ))}
              </View>
            </View>
          )
        })}
      </Page>

      {/* Roadmap */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.h1}>Roadmap di Implementazione</Text>
        <Text style={styles.p}>Implementazione in 4 fasi progressive, 12 settimane totali.</Text>
        {milestones.map(m => (
          <View key={m.phase} style={[styles.milestoneBox, { borderLeftColor: m.color }]}>
            <Text style={[styles.phaseNum, { color: m.color }]}>Fase {m.phase}: {m.title}</Text>
            <Text style={styles.phaseWeeks}>{m.weeks}</Text>
            {m.items.map((item, i) => (
              <View key={i} style={styles.bullet}>
                <Text style={styles.bulletDot}>·</Text>
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}
          </View>
        ))}
        <Text style={[styles.p, { marginTop: 16, fontFamily: 'Helvetica-Bold', color: '#f59e0b' }]}>
          Nota: ogni fase è indipendente e porta valore operativo immediato.
          La Fase 1 è operativa in 1–2 giorni.
        </Text>
      </Page>

      {/* Conclusions */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.h1}>Conclusioni e Prossimi Passi</Text>
        <Text style={styles.p}>
          GEMATA AIOS rappresenta un cambio di paradigma nel modo in cui il Gruppo Gemata
          utilizzerà l&apos;intelligenza artificiale. Non un semplice chatbot, ma un sistema operativo
          aziendale che conosce i prodotti, i clienti, le metriche e le procedure del gruppo.
        </Text>
        <Text style={styles.h2}>Prossimi passi immediati</Text>
        {[
          'Creare repository GitHub gemata-aios (privato)',
          'Iniziare con CLAUDE.md: caricare contesto Gruppo Gemata completo',
          'Creare context files per Todesco Srl e Gemata SpA',
          'Testare ContextOS in sessioni Claude Code per 1 settimana',
          'Pianificare Fase 2 (DataOS) con team IT per accesso Statwatch',
        ].map((step, i) => (
          <View key={i} style={styles.bullet}>
            <Text style={styles.bulletDot}>{i + 1}.</Text>
            <Text style={styles.bulletText}>{step}</Text>
          </View>
        ))}
        <View style={[styles.divider, { marginTop: 32 }]} />
        <Text style={{ fontSize: 9, color: '#475569', textAlign: 'center', marginTop: 12 }}>
          GEMATA AIOS — Relazione preparata con Claude Code + Superpowers{'\n'}
          Todesco Srl / Gruppo Gemata — Giugno 2026
        </Text>
      </Page>
    </Document>
  )
}
