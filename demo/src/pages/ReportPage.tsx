import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer'
import { PageWrapper } from '../components/layout/PageWrapper'
import { GemataReport } from '../pdf/GemataReport'
import { Download } from 'lucide-react'

export function ReportPage() {
  return (
    <PageWrapper>
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">Report PDF</h1>
          <p className="text-slate-400">Relazione strategica completa GEMATA AIOS — scaricabile in PDF.</p>
        </div>
        <PDFDownloadLink
          document={<GemataReport />}
          fileName="GEMATA-AIOS-Report-2026.pdf"
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold px-5 py-3 rounded-xl transition-colors"
        >
          {({ loading }) => (
            <>
              <Download size={18} />
              {loading ? 'Generando...' : 'Scarica PDF'}
            </>
          )}
        </PDFDownloadLink>
      </div>

      <div className="bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl overflow-hidden" style={{ height: '80vh' }}>
        <PDFViewer width="100%" height="100%" showToolbar={false}>
          <GemataReport />
        </PDFViewer>
      </div>
    </PageWrapper>
  )
}
